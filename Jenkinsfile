pipeline{

  agent any

  environment {
    KOYEB_API_TOKEN = credentials('KOYEB_API_TOKEN')
  }

  stages {

    stage('Koyeb Setup and Deploy Job'){
      steps{
        dir(terraform){
          // sh 'apt install curl' #Remove comment if curl is not installed on host system

          // Installing Terraform
          sh '''
          sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
          wget -O- https://apt.releases.hashicorp.com/gpg | \
          gpg --dearmor | \
          sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
          wget -O- https://apt.releases.hashicorp.com/gpg | \
          gpg --dearmor | \
          sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
          echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
          https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
          sudo tee /etc/apt/sources.list.d/hashicorp.list
          sudo apt update
          sudo apt-get install terraform
          '''

          // Running Terraform Operations
          sh '''
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