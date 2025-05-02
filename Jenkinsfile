pipeline {
  agent any

  environment {
    KOYEB_TOKEN = credentials('KOYEB_TOKEN')
  }

  stages {
    stage('Install Terraform & Deploy') {
      steps {
        dir('terraform') {
          sh '''
            #!/bin/bash
            set -e
            if [ ! -f terraform ]; then
              echo "Downloading Terraform binary..."
              curl -fsSL https://releases.hashicorp.com/terraform/1.11.4/terraform_1.11.4_linux_amd64.zip -o terraform.zip
              unzip terraform.zip
              chmod +x terraform
              rm terraform.zip
            fi

            ./terraform version
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
