import { UploadApiResponse } from "cloudinary";

type FileUpload = (
	path: string,
	{ use_filename, folder }: { use_filename: boolean; folder: "file-upload" }
) => UploadApiResponse;

export interface Cloudinary {
	uploader: {
		upload: FileUpload;
	};
}
