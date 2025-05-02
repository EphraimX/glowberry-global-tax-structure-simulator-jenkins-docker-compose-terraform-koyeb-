terraform {
  required_providers {
    koyeb = {
      source  = "koyeb/koyeb"
      version = "0.1.11"
    }
  }
}


resource "koyeb_app" "glowberry-application" {
  name = var.app_name
}

resource "koyeb_service" "glowberry-application-service" {

  app_name = koyeb_app.glowberry-application.name

  definition {

    name = var.service_name

    instance_types {
      type = var.instance_type
    }

    ports {
      port     = var.port
      protocol = "http"
    }

    scalings {
      min = 1
      max = 1
    }

    routes {
      path = "/"
      port = var.port
    }

    health_checks {
      http {
        port = var.port
        path = "/"
      }
    }

    regions = ["fra"]

    git {
      branch     = "main"
      repository = "github.com/EphraimX/glowberry-global-tax-structure-simulator-gha-docker-compose-terraform-koyeb"
      dockerfile {
        dockerfile = "Dockerfile.koyeb"
        privileged = true
      }
    }

  }

  depends_on = [
    koyeb_app.glowberry-application
  ]
}