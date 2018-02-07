# development.pp


class requirements {
  group { "puppet": ensure => "present", }
  exec { "apt-update":
    command => "/usr/bin/apt-get -y update"
  }

  package {
    []:
      ensure => installed, require => Exec['apt-update']
  }
}

class installredis {
  include redis
}

class installrvm {
  include rvm
  rvm::system_user { ubuntu: ; }


  rvm_system_ruby {
    'ruby-2.4':
      default_use => true,
      ensure => 'present';

  }
  rvm_gem {
    'bundler':
      name         => 'bundler',
      ruby_version => 'ruby-2.4',
      ensure       => latest,
      require      => Rvm_system_ruby['ruby-2.4'];
  }

}

class doinstall {
  include requirements

  include installrvm

  include installredis

  include mongodb::server

  class { 'nodejs':
    repo_url_suffix => '8.x',
  }

  include yarn
}

include doinstall