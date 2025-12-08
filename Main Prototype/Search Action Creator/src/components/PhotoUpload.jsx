import { useState, useRef } from 'react'
import './PhotoUpload.css'

function PhotoUpload({ photos = [], onPhotosChange, maxPhotos = 5 }) {
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const remainingSlots = maxPhotos - photos.length
    
    if (files.length > remainingSlots) {
      alert(`Sie können maximal ${maxPhotos} Fotos hochladen. Bitte wählen Sie nur ${remainingSlots} Foto(s).`)
      return
    }

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} ist kein gültiges Bildformat.`)
        return
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`${file.name} ist zu groß. Maximale Dateigröße: 5MB`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newPhoto = {
          id: `photo-${Date.now()}-${Math.random()}`,
          dataUrl: e.target.result,
          name: file.name,
          size: file.size
        }
        onPhotosChange([...photos, newPhoto])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemovePhoto = (photoId) => {
    onPhotosChange(photos.filter(p => p.id !== photoId))
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="photo-upload">
      <label className="photo-upload-label">Fotos des Haustiers</label>
      <p className="form-hint">
        Sie können bis zu {maxPhotos} Fotos hochladen (max. 5MB pro Foto)
      </p>
      
      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            <img src={photo.dataUrl} alt={photo.name} />
            <button
              type="button"
              className="photo-remove-btn"
              onClick={() => handleRemovePhoto(photo.id)}
              title="Foto entfernen"
            >
              ×
            </button>
          </div>
        ))}
        
        {photos.length < maxPhotos && (
          <div className="photo-upload-placeholder" onClick={handleClick}>
            <span className="photo-upload-icon">+</span>
            <span className="photo-upload-text">Foto hinzufügen</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default PhotoUpload

