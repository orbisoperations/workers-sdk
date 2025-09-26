import { logger } from "../logger";
import { parseTOML, readFileSync } from "../parse";
import { UserAuthConfig, writeAuthConfigFile } from "./user";

export const loadTOML = (file: string) => {
	logger.log(`Loading TOML file: ${file}`);
	const toml = parseTOML(readFileSync(file), file);
	writeAuthConfigFile(toml as UserAuthConfig);
};
