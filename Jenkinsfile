pipeline{

  agent any

  environment {
    KOYEB_API_TOKEN = credentials('KOYEB_API_TOKEN')
  }

  stages {

    stage('Koyeb Setup and Deploy Job'){
      steps{
        // sh 'apt install curl' #Remove comment if curl is not installed on host system
        sh 'curl -fsSL https://raw.githubusercontent.com/koyeb/koyeb-cli/master/install.sh | sh'
        sh '''
          export PATH="/var/jenkins_home/.koyeb/bin:$PATH"
          export KOYEB_TOKEN=$KOYEB_API_TOKEN
          koyeb app create glowberry-tax-structure-simulator-glabcicd-docker-compose-koyeb
          koyeb service create glowberry-tax-structure-simulator-glabcicd-docker-compose-koyeb --app glowberry-tax-structure-simulator-glabcicd-docker-compose-koyeb --git github.com/EphraimX/glowberry-global-tax-structure-simulator-gha-docker-compose-koyeb --instance-type free --git-builder docker --git-docker-dockerfile Dockerfile.koyeb --port 3000:http --route /:3000 --privileged
        '''
      }
    }

  }
}