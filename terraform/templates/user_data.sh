#!/bin/bash
cat << EOF >> /etc/ecs/ecs.config
ECS_CLUSTER=${ecs_cluster}
ECS_AVAILABLE_LOGGING_DRIVERS=["json-file","awslogs"]
EOF

# ECS Optimized AMI ではデフォルトで SSM Agent がインストールされていないので
# 手動でインストールする
# @see https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/sysman-manual-agent-install.html
yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm
