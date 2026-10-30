import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Stylized natural skin tone & sleek clothing colors
const SKIN_COLOR = "#df9b72"; // Natural warm skin tone matching ears & neck
const SHIRT_COLOR = "#252131"; // Sleek dark streetwear tee
const PANT_COLOR = "#191820"; // Dark denim / trousers
const SHOE_COLOR = "#24242c"; // Modern sneakers

const applyMaterialColor = (
  mesh: THREE.Mesh,
  colorHex: string,
  roughness = 0.6,
  metalness = 0.0
) => {
  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map((mat) => {
      const cloned = mat.clone() as THREE.MeshStandardMaterial;
      if (cloned.color) cloned.color.set(colorHex);
      if ("roughness" in cloned) cloned.roughness = roughness;
      if ("metalness" in cloned) cloned.metalness = metalness;
      return cloned;
    });
  } else if (mesh.material) {
    const cloned = mesh.material.clone() as THREE.MeshStandardMaterial;
    if (cloned.color) cloned.color.set(colorHex);
    if ("roughness" in cloned) cloned.roughness = roughness;
    if ("metalness" in cloned) cloned.metalness = metalness;
    mesh.material = cloned;
  }
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;

            character.traverse((child: any) => {
              if (child.isMesh || child.isSkinnedMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const rawName = mesh.name || "";
                const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]/g, "");
                const parentCleanName = (mesh.parent?.name || "")
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "");

                const isHair =
                  cleanName.includes("hair") || parentCleanName.includes("hair");
                const isEyebrow =
                  cleanName.includes("eyebrow") || parentCleanName.includes("eyebrow");
                const isEye =
                  cleanName.includes("eye") || parentCleanName.includes("eye");
                const isShirt =
                  cleanName.includes("shirt") || parentCleanName.includes("shirt");
                const isPant =
                  cleanName.includes("pant") || parentCleanName.includes("pant");
                const isShoe =
                  cleanName.includes("shoe") || parentCleanName.includes("shoe");
                const isSole =
                  cleanName.includes("sole") || parentCleanName.includes("sole");

                const isSkinExplicit =
                  cleanName.includes("plane007") ||
                  parentCleanName.includes("plane007") ||
                  cleanName.includes("face") ||
                  parentCleanName.includes("face") ||
                  cleanName.includes("head") ||
                  parentCleanName.includes("head") ||
                  cleanName.includes("ear") ||
                  parentCleanName.includes("ear") ||
                  cleanName.includes("neck") ||
                  parentCleanName.includes("neck") ||
                  cleanName.includes("hand") ||
                  parentCleanName.includes("hand") ||
                  cleanName.includes("skin") ||
                  parentCleanName.includes("skin") ||
                  cleanName.includes("nose") ||
                  cleanName.includes("cheek") ||
                  cleanName.includes("chin") ||
                  cleanName.includes("mouth") ||
                  cleanName.includes("lip") ||
                  (cleanName.includes("body") && !isShirt);

                // Any SkinnedMesh on the person that is not clothes/hair/eyes is skin
                const isSkin =
                  isSkinExplicit ||
                  (child.isSkinnedMesh &&
                    !isHair &&
                    !isEyebrow &&
                    !isEye &&
                    !isShirt &&
                    !isPant &&
                    !isShoe &&
                    !isSole);

                if (isSkin) {
                  applyMaterialColor(mesh, SKIN_COLOR, 0.58, 0.0);
                } else if (isShirt) {
                  applyMaterialColor(mesh, SHIRT_COLOR, 0.78, 0.05);
                } else if (isPant) {
                  applyMaterialColor(mesh, PANT_COLOR, 0.85, 0.05);
                } else if (isShoe) {
                  applyMaterialColor(mesh, SHOE_COLOR, 0.6, 0.05);
                }
              }
            });

            // Explicit named node checks covering all naming conventions (dots & stripped dots)
            const skinPartNames = [
              "Plane.007",
              "Plane007",
              "Plane_007",
              "Face.002",
              "Face002",
              "Face_002",
              "Face",
              "Head",
              "Ear.001",
              "Ear001",
              "Neck",
              "Hand",
            ];

            skinPartNames.forEach((partName) => {
              const obj = character.getObjectByName(partName) as
                | THREE.Mesh
                | undefined;
              if (obj && (obj.isMesh || (obj as any).isSkinnedMesh)) {
                applyMaterialColor(obj, SKIN_COLOR, 0.58, 0.0);
              }
            });

            const shirtObj = (character.getObjectByName("BODY.SHIRT") ||
              character.getObjectByName("BODYSHIRT") ||
              character.getObjectByName("BODY_SHIRT")) as
              | THREE.Mesh
              | undefined;
            if (shirtObj && (shirtObj.isMesh || (shirtObj as any).isSkinnedMesh)) {
              applyMaterialColor(shirtObj, SHIRT_COLOR, 0.78, 0.05);
            }

            await renderer.compileAsync(character, camera, scene);

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
