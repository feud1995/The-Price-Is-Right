

bool loadbmp(UINT textureArray[], LPSTR strFileName, int ID)//(NEW) the name of our function
{
     if(!strFileName)   return false;//If no file name was given then return a false value
    
    AUX_RGBImageRec *pBitMap = auxDIBImageLoad(strFileName); //Load the file into a new variable where we can then manipulate 
                                                             //it into our texture array
    if(pBitMap == NULL)    exit(0);// If no data was loaded then exit the program.

    glGenTextures(1, &textureArray[ID]);// Generate one texture into our texture array in the slot defined
    
    
    glBindTexture(GL_TEXTURE_2D, textureArray[ID]);//This binds the texture to a texture target
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_LINEAR);//set our filter
    glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_LINEAR);    //set our filter
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, pBitMap->sizeX, pBitMap->sizeY, 0, GL_RGB, GL_UNSIGNED_BYTE, pBitMap->data);//create our image
    //printf("%d", &textureArray[ID]);
//glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_NEAREST);
//glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_NEAREST);

    if (pBitMap)    //If pBitMap still has a value then we want to clear it.                                    
    {
        if (pBitMap->data)                                
        {
            free(pBitMap->data);                        
        }
        free(pBitMap);                                    
    }
    return true;
}

