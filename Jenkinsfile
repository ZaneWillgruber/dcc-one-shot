pipeline {
    agent none

    environment {
        APP_NAME = 'dcc-one-shot'
    }

    stages {
        stage('CI') {
            agent {
                dockerfile {
                    filename 'Dockerfile.ci'
                    args '--entrypoint=""'
                }
            }
            stages {
                stage('Install') {
                    steps {
                        sh 'pnpm install --frozen-lockfile'
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
            }
        }

        stage('Docker Build Check') {
            when {
                changeRequest()
            }
            agent {
                docker {
                    image 'docker:27-cli'
                    args '--user root:root --entrypoint="" -v /var/run/docker.sock:/var/run/docker.sock -e HOME=/tmp'
                }
            }
            steps {
                sh 'docker build -t dcc-one-shot-pr-check --pull .'
            }
        }

        stage('Build & Deploy') {
            when {
                beforeAgent true
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            agent {
                docker {
                    image 'docker:27-cli'
                    args '--user root:root --entrypoint="" -v /var/run/docker.sock:/var/run/docker.sock -e HOME=/tmp'
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
                '''
            }
            post {
                always {
                    sh 'rm -f .env'
                }
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed on branch ${env.BRANCH_NAME}"
        }
    }
}
