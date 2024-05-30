const core = require('@actions/core');
const { execSync } = require('child_process');
const path = require('path');

async function run() {
  try {
    const controlPlaneUrl = core.getInput('control-plane-url');
    const token = core.getInput('token');
    const username = core.getInput('username');
    const project = core.getInput('project');
    const service = core.getInput('service');
    const artifactory = core.getInput('artifactory');
    const dockerImage = core.getInput('docker-image');
    const registerType = core.getInput('register-type');
    const registerValue = core.getInput('register-value');
    const push = core.getInput('push') === 'true';

    // Download and extract facetsctl
    execSync('bash facetsctl-action/download_facetsctl.sh', { stdio: 'inherit' });

    const facetsctlPath = path.join(process.cwd(), 'facetsctl/bin/facetsctl');

    // Login to facets
    execSync(`${facetsctlPath} login -u ${username} -t ${token} -f ${controlPlaneUrl}`, { stdio: 'inherit' });

    // Initialize artifact
    execSync(`${facetsctlPath} artifact init -p ${project} -s ${service} -a ${artifactory}`, { stdio: 'inherit' });

    // Push Docker image if the push parameter is true
    if (push && dockerImage) {
      execSync(`${facetsctlPath} artifact push -d ${dockerImage}`, { stdio: 'inherit' });
    }

    // Register Docker image
    execSync(`${facetsctlPath} artifact register -t ${registerType} -i ${dockerImage} -v ${registerValue}`, { stdio: 'inherit' });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
