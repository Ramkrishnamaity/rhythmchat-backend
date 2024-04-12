import { Validator } from "node-input-validator"


export const InputValidator = async (input: object, rules: object): Promise<void> => {
	return new Promise((resolve, reject) => {
		const v = new Validator(input, rules)

		v.check()
			.then((match: boolean) => {
				if (!match) {
					const error = (Object.values(v.errors)[0] as any).message
					reject(error)
				} else {
					resolve()
				}
			})
			.catch((error) => {
				reject(error)
			})


	})
}