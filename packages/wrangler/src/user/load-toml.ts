import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { logger } from "../logger";
import { parseTOML, readFileSync } from "../parse";
import {
	getAuthConfigFilePath,
	reinitialiseAuthTokens,
	UserAuthConfig,
	writeAuthConfigFile,
} from "./user";

export const loadTOML = (file: string) => {
	logger.log(`Loading TOML file: ${file}`);
	const toml = readFileSync(file);
	logger.log(`TOML file: ${toml}`);
	// writeAuthConfigFile(toml as UserAuthConfig);

	const configPath = getAuthConfigFilePath();

	mkdirSync(path.dirname(configPath), {
		recursive: true,
	});
	writeFileSync(path.join(configPath), toml, {
		encoding: "utf-8",
	});

	logger.log(`Wrote TOML file to: ${configPath}`);

	reinitialiseAuthTokens();

	logger.log("✅ Successfully loaded TOML file ");
};

export const showTOML = () => {
	const configPath = getAuthConfigFilePath();
	const toml = readFileSync(configPath);
	logger.log("reading TOML file from: ", configPath);
	logger.log(`TOML file: \n\n${toml}`);
};
