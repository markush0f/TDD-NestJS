import { IsInt, IsNumber, IsString, MinLength } from "class-validator"

export class CreateProductDto {

    @IsNumber({},{
        message:'Should be a valid id.'
    })
    id: number

    @IsString({
        message: 'Should be a valid name.'
    })
    @MinLength(4)
    name: string

    @IsNumber({}, { message: 'Should be a valid price.' })
    price: number

    @IsNumber({}, { message: 'Should be a valid quantity.' })
    quantity: number
}