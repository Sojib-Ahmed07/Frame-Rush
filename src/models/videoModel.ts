import mongoose from "mongoose";

export const VIDEO_DIMENSION = {
  WIDTH: 1080,
  HEIGHT: 1920,
} as const;

export interface IVideo {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  controll?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality: number;
  };
}

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controll: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENSION.HEIGHT,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENSION.WIDTH,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  { timestamps: true },
);

const Video =
  mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;
