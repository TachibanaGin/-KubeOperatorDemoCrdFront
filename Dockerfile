FROM nginx:alpine
COPY /dist /usr/share/nginx/html/lhcz-demo-crd/
#COPY /dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
