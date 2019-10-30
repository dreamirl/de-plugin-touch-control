import { GameObject } from '@dreamirl/dreamengine'

export default class Stick extends GameObject {
  constructor (params) {
    super({
      ...params,
      interactive: true // to enable the touch events
    })

    this.bindEvents()
  }

  bindEvents () {
    this.on('pointerdown', this.touchStick)
    this.on('pointerup', this.releaseStick)
    this.on('pointermove', this.moveStick)
  }

  // To make difference with multitouch
  touchStick (event) {
    this.identifier = event.data.identifier
    this.isTouched = true
  }

  releaseStick () {
    this.isTouched = false
    this.identifier = null
    if(this.parent.onStickReleased) this.parent.onStickReleased({ x: this.x, y: this.y })
    this.x = 0
    this.y = 0
  }

  moveStick (event) {
    // WARNING - on mobile, the target is not set correctly so we need to check the position of the pointer
    if (this.isTouched && event.data && event.data.global && this.identifier === event.data.identifier) {
      const { x: xGlobal, y: yGlobal } = event.data.global
      const { x: xParent, y: yParent } = this.parent
      this.x = xGlobal - xParent
      this.y = yGlobal - yParent
      this.parent.onStickMoved({ x: this.x, y: this.y })
    }
  }
}
