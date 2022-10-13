type FileUpload = (
	path: string,
	{ use_filename, folder }: { use_filename: boolean; folder: "file-upload" }
) => { secure_url: string };

export interface Cloudinary {
	uploader: {
		upload: FileUpload;
	};
}
