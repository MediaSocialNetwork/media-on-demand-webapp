import React from 'react'

import { Break, ButtonGroup, Container, Dialog, TextButton } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'

const DialogRemovePreset = ({
  contentType,
  idle,
  isActive,
  onCancel,
  onConfirm
}) => (
  <Dialog
    isActive={ isActive }
    onOverlayClick={ onCancel }
    content={ () => (
      <Container>
        <Text mostLeft mostRight>
          You are about to permanently delete configuration for content type <Emphasize>&quot;{ contentType }&quot;</Emphasize>.
          All optimized media of this content type will be deleted along with this configuration.
          This operation cannot be undone and it should take a while to finish.
        </Text>
        <Break double />
        <ButtonGroup
          primary={ () => (
            <TextButton
              disabled={ !idle }
              variant="primary"
              onClick={ onConfirm }
            >
              Delete
            </TextButton>
          ) }
          secondary={ () => (
            <TextButton
              disabled={ !idle }
              variant="secondary"
              mostRight
              onClick={ onCancel }
            >
              Cancel
            </TextButton>
          ) }
        />
      </Container>
    ) }
  />
)

export default DialogRemovePreset
