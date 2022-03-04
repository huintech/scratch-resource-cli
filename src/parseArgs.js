const parseArgs = () => {
    const scriptArgs = process.argv.slice(2);

    let dir;
    let version;
    let repo;
    let cdn;
    let strict;
    let filePath;

    for (const arg of scriptArgs) {
        const dirSplit = arg.split(/--dir(\s+|=)/);
        if (dirSplit[1] === '=') {
            dir = dirSplit[2];
        }
        const versionSplit = arg.split(/--version(\s+|=)/);
        if (versionSplit[1] === '=') {
            version = versionSplit[2];
        }
        const repoSplit = arg.split(/--repo(\s+|=)/);
        if (repoSplit[1] === '=') {
            repo = repoSplit[2];
        }
        const cdnSplit = arg.split(/--cdn(\s+|=)/);
        if (cdnSplit[1] === '=') {
            cdn = cdnSplit[2];
        }
        const strictSplit = arg.split(/--strict(\s+|=)/);
        if (strictSplit[1] === '=') {
            strict = strictSplit[2];
        }
        const filePathSplit = arg.split(/--filePath(\s+|=)/);
        if (filePathSplit[1] === '=') {
            filePath = filePathSplit[2];
        }
    }
    return {dir, version, repo, cdn, strict, filePath};
};

module.exports = parseArgs;
