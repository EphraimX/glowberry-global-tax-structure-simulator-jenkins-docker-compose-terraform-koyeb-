pipeline{

  agent {
    docker {
      image 'hashicorp/terraform:1.7.5'
    }
  }

  environment {
    KOYEB_TOKEN = credentials('KOYEB_TOKEN')
  }

  stages {
      stage('Koyeb Setup and Deploy Job') {
        steps {
          dir('terraform') {
            sh 'terraform version'
            // Your terraform init/apply logic here
          }
        }
      }
    }
}