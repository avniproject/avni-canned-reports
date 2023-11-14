check-node-v:
ifneq ($(shell node -v),$(shell cat .nvmrc))
	@echo '\nPlease run `nvm use` in your terminal to change node version\n'
	@exit 1
endif
	@node -v

clean:
	rm -rf node_modules

deps: check-node-v
	@rm -rf package-lock.json
	yarn install

test: check-node-v
	yarn test

build: check-node-v
	yarn run build

start-with-prerelease:
	cp env_templates/.env.prerelease.local.template .env.development.local
	yarn start-with-prerelease

