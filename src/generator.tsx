import { useState } from 'react'
import {vertextOset, EdgeConnection, EdgeDirection, CubeEdgeFlags, TriangleConnectionTable} from '../marching'

type Vector = {
    x: number,
    y: number,
    z: number
}

type Vector2 = {
    x: number,
    y: number,
}

type Color = {
    r: number,
    g: number,
    b: number
}

type marchingProps = {
    verticies: Vector[],
    triangles: number[],
    normals: Vector[],
    colors: Color[],
    UVs: Vector2[],
    indicies: number[],
    boundingX : number,
    boundingY : number,
    boundingZ : number,
    meshCenter : Vector,
    position: Vector,
}

type Size = {
    x: number,
    y: number,
    z: number

}

type CTDProps = {
    P: Vector
}

type voxelWorldPosProps = {
    X: number,
    Y: number,
    Z: number
}

export function MarchingCubeObject({verticies, triangles, normals, colors, UVs, indicies, boundingX, boundingY, boundingZ, meshCenter, position}: marchingProps) {
    const [originalVerts, setOriginalVerts] = useState<Vector[]>(verticies); 
    const [originalTriangles, setOriginalTriangles] = useState<number[]>(triangles); 
    const [originalNormals, setOriginalNormals] = useState<Vector[]>(normals); 
    const [OriginalColors, SetOriginalColors] = useState<Color[]>(colors); 
    const [originalUVs, setOriginalUVs] = useState<Vector2[]>(UVs); 
    const [originalIndicies, setOriginalIndicies] = useState<number[]>(indicies); 
    
    const [marchingVerts, setMarchingVerts] = useState<Vector[]>(); 
    const [marchingTriangles, setMarchingTriangles] = useState<number[]>(); 
    const [marchingNormals, setMarchingNormals] = useState<Vector[]>(); 
    const [marchingColors, setMarchingColors] = useState<Color[]>(); 
    const [marchingUVs, setMarchingUVs] = useState<Vector2[]>(); 
    const [marchingIndicies, setMarchingIndicies] = useState<number[]>(); 

    const [voxels, setVoxels] = useState<number[]>();
    const [triangleOrder] = useState<number[]>([0,1,2]);
    const [sizeX] = useState<Size>({x:64, y: 64, z: 64});
    const [voxelSize] = useState<number>(20);
    const [vertextCount, setVertexCount] = useState<number>(0);

    const Dot = (a: Vector, b: Vector) => a.x * b.x + a.y * b.y + a.z * b.z;

    const Subtract = (a: Vector, b: Vector): Vector => ({
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    });

    const Add = (a: Vector, b: Vector): Vector => ({
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    });

    const MultiplyScalar = (v: Vector, s: number): Vector => ({
        x: v.x * s,
        y: v.y * s,
        z: v.z * s
    });

    const Cross = (a: Vector, b: Vector): Vector => ({
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    });

    const Length = (v: Vector): number => Math.sqrt(Dot(v, v));

    const Normalize = (v: Vector): Vector => {
        const len = Length(v);
        if (len === 0) {
            return {x: 0, y: 0, z: 0};
        }
        return MultiplyScalar(v, 1 / len);
    };

    const DistanceSquared = (a: Vector, b: Vector): number => {
        const d = Subtract(a, b);
        return Dot(d, d);
    };

    const ClosestPointOnTriangleToPoint = (P: Vector, A: Vector, B: Vector, C: Vector): Vector => {
        const AB = Subtract(B, A);
        const AC = Subtract(C, A);
        const AP = Subtract(P, A);

        const d1 = Dot(AB, AP);
        const d2 = Dot(AC, AP);
        if (d1 <= 0 && d2 <= 0) {
            return A;
        }

        const BP = Subtract(P, B);
        const d3 = Dot(AB, BP);
        const d4 = Dot(AC, BP);
        if (d3 >= 0 && d4 <= d3) {
            return B;
        }

        const vc = d1 * d4 - d3 * d2;
        if (vc <= 0 && d1 >= 0 && d3 <= 0) {
            const v = d1 / (d1 - d3);
            return Add(A, MultiplyScalar(AB, v));
        }

        const CP = Subtract(P, C);
        const d5 = Dot(AB, CP);
        const d6 = Dot(AC, CP);
        if (d6 >= 0 && d5 <= d6) {
            return C;
        }

        const vb = d5 * d2 - d1 * d6;
        if (vb <= 0 && d2 >= 0 && d6 <= 0) {
            const w = d2 / (d2 - d6);
            return Add(A, MultiplyScalar(AC, w));
        }

        const va = d3 * d6 - d5 * d4;
        if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
            const BC = Subtract(C, B);
            const w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
            return Add(B, MultiplyScalar(BC, w));
        }

        const denom = 1 / (va + vb + vc);
        const v = vb * denom;
        const w = vc * denom;
        return Add(A, Add(MultiplyScalar(AB, v), MultiplyScalar(AC, w)));
    };


    const ClosestTriangleDistance = ({P}: CTDProps) => {
        let minDist = Infinity;
        for (let i = 0; i < originalIndicies.length; i+=3)
        {
            const A = originalVerts[originalIndicies[i]];
            const B = originalVerts[originalIndicies[i + 1]];
            const C = originalVerts[originalIndicies[i + 2]];

            const closest = ClosestPointOnTriangleToPoint(P, A, B, C);
            const distSq = DistanceSquared(P, closest);
            if (distSq < minDist) {
                minDist = distSq;
            }
        }

        return Math.sqrt(minDist);
    }

    const SegmentTriangleInterset = (
        rayStart: Vector,
        rayEnd: Vector,
        A: Vector,
        B: Vector,
        C: Vector
    ): { hit: boolean, hitPoint: Vector, normal: Vector } => {
        const epsilon = 0.0000001;
        const edge1 = Subtract(B, A);
        const edge2 = Subtract(C, A);
        const normal = Normalize(Cross(edge1, edge2));

        const dir = Subtract(rayEnd, rayStart);
        const h = Cross(dir, edge2);
        const a = Dot(edge1, h);

        if (a > -epsilon && a < epsilon) {
            return {hit: false, hitPoint: rayStart, normal};
        }

        const f = 1 / a;
        const s = Subtract(rayStart, A);
        const u = f * Dot(s, h);

        if (u < 0 || u > 1) {
            return {hit: false, hitPoint: rayStart, normal};
        }

        const q = Cross(s, edge1);
        const v = f * Dot(dir, q);

        if (v < 0 || u + v > 1) {
            return {hit: false, hitPoint: rayStart, normal};
        }

        const t = f * Dot(edge2, q);
        if (t < 0 || t > 1) {
            return {hit: false, hitPoint: rayStart, normal};
        }

        const hitPoint = Add(rayStart, MultiplyScalar(dir, t));
        return {hit: true, hitPoint, normal};
    };

    const IsInsideMesh = ({P}: CTDProps) => {
        const rayDirections : Vector[] = [
            {x: 1.0, y: 0.0, z:0.0},
            {x: 0.0, y: 1.0, z:0.0},
            {x: 0.0, y: 0.0, z:1.0},
            {x: -1.0, y: 0.0, z:0.0},
            {x: 0.0, y: -1.0, z:0.0},
            {x: 0.0, y: 0.0, z:-1.0},
            {x: 1.0, y: 1.0, z:1.0},
            {x: -1.0, y: 1.0, z:1.0},
            {x: 1.0, y: -1.0, z:1.0},
            {x: 1.0, y: 1.0, z:-1.0}
        ];

        let insideCount = 0;
        const totalRays = rayDirections.length;
        const epsilon = 0.00001;

        rayDirections.forEach(rayDir => {
            let rayStart = MultiplyScalar(Add(P, rayDir), epsilon);
            let rayEnd = MultiplyScalar(Add(P, rayDir), 10000);

            let hits = 0;
            let hasHit = false;

            for (let i = 0; i < originalIndicies.length; i+=3)
            {
                const A = originalVerts[originalIndicies[i]];
                const B = originalVerts[originalIndicies[i + 1]];
                const C = originalVerts[originalIndicies[i + 2]];

                const intersection = SegmentTriangleInterset(rayStart, rayEnd, A, B, C);

                if(intersection.hit) {
                    hasHit = true;
                    hits++;
                }

            }


            if(!hasHit) {
                let oppositeRayEnd = MultiplyScalar(Subtract(P, rayDir), 10000);

                for (let i = 0; i < originalIndicies.length; i+=3)
                {
                    const A = originalVerts[originalIndicies[i]];
                    const B = originalVerts[originalIndicies[i + 1]];
                    const C = originalVerts[originalIndicies[i + 2]];

                    const intersection = SegmentTriangleInterset(rayStart, oppositeRayEnd, A, B, C);

                    if(intersection.hit) {
                        hits++;
                    }

                }
            }
            
            if(hits % 2 == 1)
            {
                insideCount += 2;
            }
        });

        return insideCount > (totalRays / 2);
    };

    /*const GetVoxelWorldPos = ({X, Y, Z} : voxelWorldPosProps) => {
        
        let vectorWrap: Vector = {x: X, y: Y, z: Z};
        let localPos = MultiplyScalar(vectorWrap, voxelSize);

    };*/

    return "";
}