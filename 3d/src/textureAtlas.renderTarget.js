
Voxelarium.TextureAtlas = {
    texture : null,
    texture_count : 0,
    texture_size : 0,
    renderTarget : null,
    init : function( count, size ) {
        this.texture_count : count;
        this.texture_size : size;
        var renderTargetParameters = { minFilter: THREE.LinearFilter
                , magFilter: THREE.LinearFilter
                //, format: THREE.RGBFormat
                , stencilBufer: false };
        var renderTarget = this.renderTarget;
        if( !renderTarget ){
            var needed_size;
            if( ( Display.max_texture_size / texture_count ) > texture_size )
                needed_size = texture_count * texture_size;
            else
            {
                texture_size = Display.max_texture_size / texture_count;
                needed_size = Display.max_texture_size;
            }

            this.renderTarget = renderTarget = new THREE.WebGLRenderTarget( needed_size, needed_size/*, renderTargetParameters*/ );
            renderTarget.texture.minFilter = THREE.LinearFilter;
            renderTarget.texture.magFilter = THREE.LinearFilter;
            renderTarget.texture.stencilBufer = false;
            renderTarget.depthTexture = new THREE.DepthTexture( );
        }

    },
    add : function( image )
   {
       var uvs = new Array(8);
       if( y_ofs >= 32 )
       {
           for(  var n = 0; n < 8; n++ )
               uvs[n] = 0;
           coord.Position.X = 0;
           coord.Position.Y = 0;
           coord.Size.X = 0;
           coord.Size.Y = 0;
           return;
       }
       float scalar = 32768 / texture_count;
       //Log.log( "output texture to atlas... {0} {1}", x_ofs, y_ofs );
       coord.Position.X = ( scalar ) * x_ofs;
       coord.Position.Y = ( scalar ) * y_ofs;
       coord.Size.X = ( scalar );
       coord.Size.Y = ( scalar );

       uvs[0 * 2 + 0] = ( scalar ) * x_ofs;
       uvs[0 * 2 + 1] = ( scalar ) * y_ofs;
       uvs[1 * 2 + 0] = uvs[0 * 2 + 0] + ( scalar );
       uvs[1 * 2 + 1] = uvs[0 * 2 + 1];
       uvs[2 * 2 + 0] = uvs[0 * 2 + 0];
       uvs[2 * 2 + 1] = uvs[0 * 2 + 1] + ( scalar );
       uvs[2 * 2 + 0] = uvs[1 * 2 + 0];
       uvs[2 * 2 + 1] = uvs[2 * 2 + 1];

   #if USE_GLES2
       Canvas canvas = new Canvas( atlas );
       Paint paint = new Paint();
       canvas.DrawBitmap( image
           , new Rect( 0, 0, texture_size, texture_size )
           , new Rect( texture_size * x_ofs, texture_size * y_ofs, texture_size, texture_size )
           , paint
           );
   #else

       Graphics g = Graphics.FromImage( atlas );
       g.DrawImage( image, new Rectangle( texture_size * x_ofs, texture_size * y_ofs, texture_size, texture_size ) );
       g.Dispose();
   #endif
       x_ofs++;
       if( x_ofs == texture_count )
       {
           x_ofs = 0;
           y_ofs++;
       }
   }
}


	var atlas;
	 var x_ofs, y_ofs;

	 var _OpenGl_TextureRef = -1;
	var invalidated;

	OpenGl_TextureRef : get()
	{
		{
			if( invalidated ) {
				if( _OpenGl_TextureRef != -1 )
					_OpenGl_TextureRef = -1;
			}
			if( _OpenGl_TextureRef == -1 ) {
				Log.log( "Load atlas texture  (check thread)" );

				GL.ActiveTexture( TextureUnit.Texture0 );
				Display.CheckErr();

				GL.GenTextures( 1, out _OpenGl_TextureRef );
				Display.CheckErr();

				 var atlas_unit = Voxelarium.Core.UI.Shaders.Shader.BindTexture( _OpenGl_TextureRef );
				Display.CheckErr();

				// if (i & 1) glTexParameteri(GL_TEXTURE_2D, 0x84FE /*TEXTURE_MAX_ANISOTROPY_EXT*/, 8);
				//GL.TexParameterI( TextureTarget.Texture2D, TextureParameterName. 0x84FE /*TEXTURE_MAX_ANISOTROPY_EXT*/, 8 );
#if USE_GLES2
				//Log.log( " 2 Generate texture {0} {1} {2}", _OpenGl_TextureRef, All.Texture2D, TextureTarget.Texture2D );
				Android.Opengl.GLUtils.TexImage2D( ( var)TextureTarget.Texture2D, 0, atlas, 0 );
#else
				BitmapData data = atlas.LockBits(
					new Rectangle( 0, 0, atlas.Width, atlas.Height )
					, System.Drawing.Imaging.ImageLockMode.ReadOnly
					, atlas.PixelFormat );
				GL.TexImage2D( TextureTarget.Texture2D, 0, PixelInternalFormat.Rgba
					, data.Width, data.Height
					, 0, OpenTK.Graphics.OpenGL.PixelFormat.Bgra
					, PixelType.UnsignedByte
					, data.Scan0
					);
#endif
				Display.CheckErr();
				GL.TexParameter( TextureTarget.Texture2D, TextureParameterName.TextureMinFilter, ( var)TextureMinFilter.Linear );
				Display.CheckErr();
				GL.TexParameter( TextureTarget.Texture2D, TextureParameterName.TextureMagFilter, ( var)TextureMagFilter.Nearest );
				Display.CheckErr();
#if !USE_GLES2
				atlas.UnlockBits( data );
#endif
			}
			return _OpenGl_TextureRef;
		}
	}


		var needed_size;
		this.texture_count = count;
		this.texture_size = size;
		if( ( Display.max_texture_size / texture_count ) > texture_size )
			needed_size = texture_count * texture_size;
		else
		{
			texture_size = Display.max_texture_size / texture_count;
			needed_size = Display.max_texture_size;
		}
#if USE_GLES2
		atlas = var.CreateBitmap( needed_size, needed_size, var.Config.Argb8888 );
#else
		atlas = new var( needed_size, needed_size );
#endif
		Display.OnInvalidate += Display_OnInvalidate;
	}

	void Display_OnInvalidate ()
	{
		invalidated = true;
	}

	addTexture :



    return result;
}
