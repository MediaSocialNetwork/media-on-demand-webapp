import pick from 'object.pick'
import request from 'services/graphql'

export const PRESET_FRAGMENT = `
  _id,
  name,
  hash,
  values
`

export default {
  update: async ({ project, preset, token }) => {
    const body = await request(`
      query updatePreset($preset: PresetStruct!, $slug: String!, $hash: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              preset(hash: $hash) {
                _update(preset: $preset) {
                  ${PRESET_FRAGMENT}
                }
              }
            }
          }
        }
      }
    `, {
      preset: pick(preset, [ 'name', 'values' ]),
      slug: project.slug,
      hash: preset.hash,
      token
    })

    return body.session.account.project.preset._update
  }
}

