pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('REACT-ECOMMERCEAPI') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat 9') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\reactecommerceapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\reactecommerceapi"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\reactecommerceapi"
                xcopy /E /I /Y REACT-ECOMMERCEAPI\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\reactecommerceapi"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('SPRINGBOOT-ECOMMERCEAPI') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat 9') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\springbootecommerceapi.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\springbootecommerceapi.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\springbootecommerceapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\springbootecommerceapi"
                )
                copy "SPRINGBOOT-ECOMMERCEAPI\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\springbootecommerceapi.war"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful on Tomcat 9!'
        }
        failure {
            echo '❌ Pipeline Failed.'
        }
    }
}
