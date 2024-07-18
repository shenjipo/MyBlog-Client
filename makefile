
.PHONY: _build_prod
_build_prod: 
	pnpm run build;


.PHONY: docker_build
docker_build:
	make _build_prod;\
	docker build -t blog-client-img:latest .;\
	docker save -o blog-client-img.tar blog-client-img:latest

.PHONY: nginx_build
nginx_build:
	docker build -f Dockerfile.nginx -t ng:latest .;\
	docker save -o ng.tar ng:latest

define RUN_LOCAL_TXT
Which service do you want to start run?
  1) docker_build
  2) _build_prod
  3) nginx_build
endef
export RUN_LOCAL_TXT

.PHONY: run
run: ## run services with local programming language envinroment
	@echo "$$RUN_LOCAL_TXT"
	@read -p "ENTER THE NUMBER: " SERVICE ;\
 	if [ "$$SERVICE" = "1" ]; then make docker_build; fi ;\
	if [ "$$SERVICE" = "2" ]; then make _build_prod; fi ;\
	if [ "$$SERVICE" = "3" ]; then make nginx_build; fi ;\

docker run --name ng -d -p 80:80 -v /opt/nginx.conf:/etc/nginx/nginx.conf:ro  -v /opt/html:/usr/share/nginx/html:ro ng