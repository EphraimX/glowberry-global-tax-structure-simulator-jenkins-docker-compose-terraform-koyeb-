variable "app_name" {
  description = "Koyeb App Name"
  default     = "gtaxsim-gha-dkr-tfkb"
}

variable "service_name" {
  description = "Koyeb Service Name"
  default     = "gtaxsim-gha-dkr-tfkb"
}

variable "instance_type" {
  description = "Koyeb Instance Type"
  default     = "nano"
}

variable "port" {
  description = "Koyeb Port"
  default     = 3000
}