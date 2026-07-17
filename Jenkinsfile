pipeline {
    agent any

    environment {
        APP_NAME = 'dcc-one-shot'
    }

    stages {
        stage('Install') {
            steps {
                sh 'corepack enable && pnpm install --frozen-lockfile'
            }
        }

        stage('Lint & Type Check') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'pnpm lint'
                    }
                }
                stage('Type Check') {
                    steps {
                        sh 'pnpm exec tsc --noEmit'
                    }
                }
            }
        }

        stage('Build & Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            environment {
                COMPOSE_FILE    = "${env.BRANCH_NAME == 'main' ? 'docker-compose.yml' : 'docker-compose.dev.yml'}"
                ENV_FILE_CRED   = credentials("${env.BRANCH_NAME == 'main' ? 'dcc-env-prod' : 'dcc-env-dev'}")
            }
            steps {
                sh '''
                    cp "$ENV_FILE_CRED" .env
                    docker compose -f "$COMPOSE_FILE" --profile migrate --env-file .env build --pull
                    docker compose -f "$COMPOSE_FILE" --env-file .env up -d db
                    docker compose -f "$COMPOSE_FILE" --env-file .env --profile migrate run --rm migrate
                    docker compose -f "$COMPOSE_FILE" --env-file .env up -d --remove-orphans
                    rm -f .env
                '''
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
            cleanWs()
        }
        failure {
            echo "Pipeline failed on branch ${env.BRANCH_NAME}"
        }
    }
}
