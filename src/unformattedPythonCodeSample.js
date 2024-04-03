const unformattedPythonCodeSample = `
class bdist_rpm ( Command):

    user_options = [    'bdist-base=', None,]
         
    def _format_changelog(self, changelog):
        if not changelog:
            return changelog
        new_changelog = []
        for line in string.split(string.strip(changelog), '\n'):
            line = string.strip(line)
            if line[0 ] =='*' :
                new_changelog.extend ( [''  ])
            elif line[0] == '-':
                new_changelog.append(line )
            else:
                new_changelog.append('  '+ line)

`;
export default unformattedPythonCodeSample;