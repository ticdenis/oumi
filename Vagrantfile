Vagrant.configure(2) do |config|
  config.vm.box = "generic/centos7"
  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 2
  end
  config.vm.hostname = "oumi"
  config.vm.network "private_network", type: "dhcp"
  config.vm.synced_folder ".", "/vagrant", type: "nfs"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.provision "shell", inline: <<-SHELL
    # Install Git
    sudo yum install -y git
    # Install Docker dependencies
    sudo yum install -y yum-utils device-mapper-persistent-data lvm2 nano
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    # Install Docker
    sudo yum install -y docker-ce docker-ce-cli containerd.io
    sudo systemctl start docker
    sudo usermod -aG docker vagrant
    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    # Install ZSH
    sudo yum install -y zsh
    sudo chsh -s /bin/zsh vagrant
    # Set /vagrant as default directory
    echo 'cd /vagrant' >> /home/vagrant/.bashrc
    echo 'cd /vagrant' >> /home/vagrant/.zshrc
    # Bootstrap
    cd /vagrant
    make docker-build
    make docker-yarn COMMAND="install"
    make docker-yarn COMMAND="build"
    make docker-yarn COMMAND="prepare-env"
  SHELL
end
