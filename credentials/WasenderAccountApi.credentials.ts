import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class WasenderAccountApi implements ICredentialType {
	name = 'wasenderAccountApi';

	displayName = 'WasenderAPI Account API';

	icon: Icon = {
		light: 'file:../icons/wasenderapi.svg',
		dark: 'file:../icons/wasenderapi.dark.svg',
	};

	documentationUrl =
		'https://wasenderapi.com/api-docs/authentication/how-to-authenticate-api-requests-using-personal-access-token';

	properties: INodeProperties[] = [
		{
			displayName: 'Personal Access Token',
			name: 'personalAccessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://www.wasenderapi.com/api',
			placeholder: 'https://www.wasenderapi.com/api',
			description:
				'Override only for self-hosted or proxy deployments. Trailing slashes are removed and /api is appended if missing.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.personalAccessToken.trim()}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				"={{ String($credentials.baseUrl || 'https://www.wasenderapi.com/api').trim().replace(/\\/+$/, '').replace(/(\\/api)?$/, '/api') }}",
			url: '/auth-check',
			method: 'GET',
		},
	};
}
