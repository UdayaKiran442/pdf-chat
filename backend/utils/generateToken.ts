import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
	const token = jwt.sign(
		{
			userId: userId,
		},
		"secret",
		{
			expiresIn: "2d",
		},
	);
	return token;
};

export default generateToken;
