Will add notes for the backend project here ...

Verify if the image exists:

gcloud container images list-tags gcr.io/auris-402923/backend

(This will show the available versions of your image.)

Rebuild and Push the image

# Authenticate with Google Cloud

gcloud auth configure-docker

or login with the command:

gcloud auth login

# Build the image

docker build -t gcr.io/auris-402923/backend .

# Push the image

docker push gcr.io/auris-402923/backend

Deploy to Cloud Run

gcloud run deploy backend-service \
 --image gcr.io/auris-402923/backend \
 --platform managed \
 --region us-central1 \
 --allow-unauthenticated

gcloud run deploy backend-service \
 --image gcr.io/auris-402923/backend \
 --platform managed \
 --region us-central1 \
 --vpc-connector=auris-mongodb-vpc \
 --allow-unauthenticated

gcloud run deploy backend-service \
 --image gcr.io/auris-402923/backend \
 --platform managed \
 --region us-central1 \
 --vpc-connector=auris-mongodb-vpc \
 --vpc-egress=all-traffic --allow-unauthenticated

Test the service

gcloud run services describe backend-service --region us-central1

It should return the URL of your service. Open it in a browser or use:

curl -i https://YOUR-SERVICE-URL/

1. Update server.ts to listen on 0.0.0.0.
2. Ensure Dockerfile has EXPOSE 8080 and correct CMD.
3. Rebuild and push the Docker image.
4. Re-deploy to Cloud Run.

# mongodb://mlukusa:fXJLP2P6o7Tiu9cC@10.128.0.0:27017/aurisdev?authSource=admin

Create the VPC Connector First

gcloud compute networks vpc-access connectors create auris-mongodb-vpc \
 --region=us-central1 \
 --network=default \
 --range=10.8.0.0/28

Wait for It to Be Ready

gcloud compute networks vpc-access connectors describe auris-mongodb-vpc \
 --region=us-central1

1. Reserve a Static IP
   gcloud compute addresses create cloudrun-static-ip \
    --region=us-central1

2. Create a Cloud Router
   gcloud compute routers create cloudrun-router \
    --network=default \
    --region=us-central1

3. Create a Cloud NAT using that IP
   gcloud compute routers nats create cloudrun-nat \
    --router=cloudrun-router \
    --region=us-central1 \
    --nat-external-ip-pool=cloudrun-static-ip \
    --nat-all-subnet-ip-ranges \
    --enable-logging

4.Deploy Cloud Run with VPC Connector + Egress
gcloud run deploy backend-service \
 --image gcr.io/YOUR_PROJECT_ID/backend \
 --platform managed \
 --region us-central1 \
 --vpc-connector=mongodb-vpc \
 --vpc-egress=all-traffic \
 --allow-unauthenticated
