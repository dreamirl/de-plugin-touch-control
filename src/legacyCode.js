/**
 * @description here is legacy code I don't want to forget about but it's not being used in the live code
 */

 function onMouseMove () {
    if (this.isTouched) {
        mouse.stopPropagation = true
        if (Collisions.pointCircleCollision(mouse, this.collider)) {
          this.stick.position.setPosition({ 'x': mouse.x - this.position.x, 'y': mouse.y - this.position.y })
        } else {
          var angle = this.position.getAngle(mouse)
          this.stick.position.setPosition(Math.cos(angle) * this.collider.radius, Math.sin(angle) * this.collider.radius)
        }
  
        this.normalizedPosition = this.getNormalizedPosition(this.stick.position.x, this.stick.position.y, this.collider.radius)
        if (this.oldNormalizedPosition.x != this.normalizedPosition.x && this.oldNormalizedPosition.y != this.normalizedPosition.y) {
          this.oldNormalizedPosition = this.normalizedPosition
          this.onStickMoved(this.normalizedPosition)
          this.trigger('stickMoved', this.normalizedPosition)
        }
      }
 }

 function getNormalizedPosition (x, y, radius) {
    var position = { x: 0, y: 0 }

    position.x = x / radius
    position.y = y / radius

    if (position.x > 1) {
      position.x = 1
    }
    if (position.y > 1) {
      position.y = 1
    }
    if (position.x < -1) {
      position.x = -1
    }
    if (position.y < -1) { position.y = -1 }

    position.x = Math.round(position.x * 100) / 100
    position.y = Math.round(position.y * 100) / 100

    return position
  }

  function stopMe (mouse) {
    if (mouse) {
      mouse.stopPropagation = true
    }

    this.isTouched = false
    this.stick.position.setPosition(0, 0)

    this.onStickMoved({ x: 0, y: 0 })
    this.trigger('stickStopped', this.normalizedPosition)

    if (touchControlParams.appearOnTouch) {
      this.renderer.fadeOut(touchControlParams.fadeOutTime)
      this.stick.renderer.fadeOut(touchControlParams.fadeOutTime)

      this.collider.enable = false
      this.trigger('disappear')
    }
  }

  function appearOnTouch (touchControlParams) {
    if (touchControlParams.appearOnTouch === undefined) touchControlParams.appearOnTouch = false
    if (touchControlParams.fadeOutTime === undefined) touchControlParams.fadeOutTime = 200
    if (touchControlParams.fadeInTime === undefined) touchControlParams.fadeInTime = 200
  }


  function scaleMoveEvent () {
    if (window.devicePixelRatio === 1) {
      this.moveScalerX = 1
      this.moveScalerY = 1
      return
    }
    this.moveScalerX = window.innerWidth / window.screen.availWidth
    this.moveScalerY = window.innerHeight / window.screen.availHeight
  }