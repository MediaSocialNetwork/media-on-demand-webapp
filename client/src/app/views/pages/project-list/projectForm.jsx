import React from 'react'
// import { TextBox  } from 'ui/redux-form'

import { Button, TextBox } from 'ui/elements'
import { Form } from 'ui/compounds'

const projectForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header> Create new project </Form.Header>
    <Form.Description> Enter info your project and click to 'Add project ' button </Form.Description>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="projectName"
        placeholder="Name project"
        autoFocus
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="slug"
        placeholder="Slug"
        autoFocus
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="prettyOrigin:"
        placeholder="Pretty origin"
        autoFocus
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="origin:"
        placeholder="Origin"
        autoFocus
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button type="submit">Add project</Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default projectForm