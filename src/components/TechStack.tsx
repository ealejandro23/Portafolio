import * as THREE from 'three'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import './styles/TechStack.css'
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  type RapierRigidBody,
} from '@react-three/rapier'

const techItems = [
  { label: 'Python', color: '#3776AB' },
  { label: 'JavaScript', color: '#F7DF1E' },
  { label: 'Kotlin', color: '#7F52FF' },
  { label: 'Node.js', color: '#339933' },
  { label: 'MySQL', color: '#4479A1' },
  { label: 'HTML/CSS', color: '#E34F26' },
  { label: 'Git', color: '#F05032' },
  { label: 'Spring', color: '#6DB33F' },
]

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)

const spheres = [...Array(24)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 0.9][Math.floor(Math.random() * 5)],
  techIndex: Math.floor(Math.random() * techItems.length),
}))

type SphereProps = {
  vec?: THREE.Vector3
  scale: number
  techIndex: number
  r?: typeof THREE.MathUtils.randFloatSpread
  material: THREE.MeshPhysicalMaterial
  isActive: boolean
}

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null)

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return
    delta = Math.min(0.1, delta)
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale))
    api.current.applyImpulse(impulse, true)
  })

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3(), isActive }: { vec?: THREE.Vector3; isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null)

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return
    const target = vec.lerp(
      new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0),
      0.2
    )
    ref.current.setNextKinematicTranslation(target)
  })

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  )
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('techstack-section')
      if (!el) return
      const rect = el.getBoundingClientRect()
      setIsActive(rect.top < window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const materials = useMemo(() =>
    techItems.map(item =>
      new THREE.MeshPhysicalMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.25,
        metalness: 0.6,
        roughness: 0.8,
        clearcoat: 0.2,
      })
    ), [])

  return (
    <div className="techstack" id="techstack-section">
      <div className="section-container">
        <div className="tech-eyebrow">
          <span className="eyebrow-line-dark" />
          Stack tecnológico
        </div>
        <h2 className="tech-title">
          Mis <span>Tecnologías</span>
        </h2>
        <div className="tech-legend">
          {techItems.map(item => (
            <div key={item.label} className="tech-pill">
              <span className="tech-dot" style={{ background: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={state => { state.gl.toneMappingExposure = 1.5 }}
        className="tech-canvas"
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
        <directionalLight position={[0, 5, -4]} intensity={1.5} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              techIndex={props.techIndex}
              material={materials[props.techIndex]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment preset="city" environmentIntensity={0.5} />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#00c896" aoRadius={2} intensity={1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default TechStack
