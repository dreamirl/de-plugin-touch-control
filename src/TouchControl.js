import { GameObject } from '@dreamirl/dreamengine'
import Stick from './Stick'

/**
 * @description The touch-control plugin allow the game to show a movable stick and to bind a callback function to it when it's moved
 * @param 
 */
export default class TouchControl extends GameObject {
  constructor(params){

    const { 
        backgroundSpriteRenderer,
        stickSpriteRenderer,
        onStickMoved,
        onStickReleased
    } = params

    // Check that mandatory parameters are correct 
    // TODO - type check the renderers with instanceof
    if(!backgroundSpriteRenderer) console.error('you must provide a background sprite to the touch control')
    if(!stickSpriteRenderer) console.error('you must provide a sprite to the touch control')
    if(!onStickMoved || !(onStickMoved instanceof Function) ) console.error('you must provide a onStickMoved function')
    if(onStickReleased instanceof Function) console.error('optional parameter "onStickReleased" must be a function')

    // Set the background renderer and instantiate the GameObject
    params.renderers = [backgroundSpriteRenderer]
    super(params)

    // Create the Stick and attach it to the TouchControl
    this.stick = new Stick({
        renderers: [stickSpriteRenderer]
    })
    this.add(this.stick)

    // Bind the onStickMoved and onStickReleased (if exists) callback
    this.onStickMoved = onStickMoved
    if(onStickReleased) this.onStickReleased = onStickReleased
  }

  stopMe(){
    this.stick.interactive = false
  }

  startMe(){
    this.stick.interactive = true
  }
}
