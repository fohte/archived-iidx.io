#!/bin/bash
cat << EOF >> /etc/ecs/ecs.config
ECS_CLUSTER=${ecs_cluster}
ECS_AVAILABLE_LOGGING_DRIVERS=["json-file","awslogs"]
EOF
