import jwt from "jsonwebtoken";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const generateToken = (id: any) => {
	const token = jwt.sign(
		{
			_id: id,
		},
		"secret",
		{
			expiresIn: "2d",
		},
	);
	return token;
};

export default generateToken;
