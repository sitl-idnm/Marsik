'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import * as THREE from 'three'

interface EnvironmentGLTFProps extends GroupProps {
  url: string
  scale?: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
}

const EnvironmentGLTF: React.FC<EnvironmentGLTFProps> = ({
  url,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  ...props
}) => {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(url) as unknown as { scene: THREE.Scene } // Явно указываем тип сцены

  useEffect(() => {
    if (scene) {
      // Обновление материалов для поддержки отражений
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) { // Уточняем тип для child
          const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          material.envMapIntensity = 1
          material.metalness = 1
          material.roughness = 0.1
          material.needsUpdate = true // Применить изменения
        }
      })

      if (group.current) {
        const clonedScene = scene.clone() // Клонируем сцену для добавления
        group.current.add(clonedScene)
      }
    }
  }, [scene])

  return (
    <group ref={group} scale={scale} position={position} rotation={rotation} {...props}>
      {/* GLB-модель */}
    </group>
  )
}

// Предзагрузка модели
useGLTF.preload('/models/environment.glb')

export default EnvironmentGLTF
