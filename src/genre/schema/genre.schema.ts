import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Movie } from 'src/movie/schema/movie.schema';
import { Document, Types } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema({
  timestamps: true,
})
export class Genre extends Document {
  @Prop({
    required: true,
    unique: true,
    // select: false,
  })
  name: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Movie',
      },
    ],
  })
  movies: Movie[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);

// GenreSchema.set('toObject', {
//   transform: (model, ret) => {
//     ret._id = ret._id.toString();
//     return ret;
//   },
// });
