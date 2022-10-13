import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { UserDocument } from "../utils/user.type";

const UserSchema = new Schema<UserDocument>({
	name: {
		type: String,
		required: [true, "please provide name"],
		minlength: 2,
		maxlength: 30,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "please provide valid email",
		},
	},
	password: {
		type: String,
		required: [true, "please provide password"],
		minlength: 6,
	},

	educator: {
		type: Boolean,
		default: false,
	},
});

// hash password

UserSchema.pre("save", async function (next) {
	let user = this as UserDocument;
	if (!user.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	return next();
});

// compare password

UserSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

const User = model<UserDocument>("User", UserSchema);
export default User;
