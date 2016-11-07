from fabric.contrib.files import exists
from fabric.api import cd, env, sudo, task


env.use_ssh_config = True
env.hosts = ['codebakery.io']
env.sudo_user = 'www-data'
env.project_root = '/srv/www/time-tracker'
env.repo_url = 'https://github.com/codebakery/time-tracker-web.git'
env.npm_cache_dir = '/srv/www/.npmcache'


@task
def clone():
    if not exists(env.project_root):
        sudo('git clone {repo_url} {project_root}'.format(**env), user='root')
        sudo('chown -R {sudo_user} {project_root}'.format(**env), user='root')


@task
def pull():
    with cd(env.project_root):
        sudo('git pull')


@task
def npm_update():
    with cd(env.project_root):
        sudo('mkdir -p {npm_cache_dir}'.format(**env), user='root')
        sudo('chown -R {sudo_user} {npm_cache_dir}'.format(**env), user='root')
        sudo('npm update --progress false --cache {npm_cache_dir}'.format(**env))


@task
def npm_build():
    with cd(env.project_root):
        sudo('mkdir -p {npm_cache_dir}'.format(**env), user='root')
        sudo('chown -R {sudo_user} {npm_cache_dir}'.format(**env), user='root')
        sudo('npm run build --progress false --cache {npm_cache_dir}'.format(**env))


@task(default=True)
def deploy():
    clone()
    pull()
    npm_update()
    npm_build()
