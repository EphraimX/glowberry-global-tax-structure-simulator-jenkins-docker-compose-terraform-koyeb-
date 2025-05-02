pipeline{

  agent any

  environment {
    KOYEB_TOKEN = credentials('KOYEB_TOKEN')
  }

  stages {

    stage('Koyeb Setup and Deploy Job'){
      steps{
        dir('terraform'){
          // sh 'apt install curl' #Remove comment if curl is not installed on host system

          // Installing Terraform
          sh '''
          apt-get update && apt-get install -y gnupg software-properties-common wget curl lsb-release gpg

          wget -O- https://apt.releases.hashicorp.com/gpg | \
          gpg --dearmor > /usr/share/keyrings/hashicorp-archive-keyring.gpg

          echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
          https://apt.releases.hashicorp.com $(lsb_release -cs) main" > /etc/apt/sources.list.d/hashicorp.list

          apt-get update && apt-get install -y terraform
          '''

          // Running Terraform Operations
          sh '''
          export KOYEB_TOKEN=$KOYEB_TOKEN
          terraform init
          terraform fmt
          terraform validate
          terraform plan
          terraform apply --auto-approve
          '''
        }
        
      }
    }

  }
}