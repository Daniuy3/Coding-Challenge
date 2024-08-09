import { z } from "zod";


export const responseSchema = z.array(
    z.object({
        description: z.string(),
        age: z.number(),
        url: z.string(),
        bankName: z.string(),
    })
)
