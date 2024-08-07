# 使用官方nginx镜像作为基础镜像  
FROM nginx:alpine  
  
# 复制构建好的Vue应用文件到nginx的html目录  
COPY ./dist /usr/share/nginx/html/Blog/dist  
  
# 暴露80端口  
EXPOSE 80  
  
# 设置nginx配置  
# 如果需要自定义nginx配置，可以先创建一个nginx.conf文件，然后替换下面的COPY指令  
COPY ./nginx.conf /etc/nginx/nginx.conf  
  
# 默认情况下，nginx的配置文件已经足够用于静态文件服务  
# 因此，这里不需要显式地复制配置文件，除非你有特殊需求  
  
# 启动nginx  
CMD ["nginx", "-g", "daemon off;"]