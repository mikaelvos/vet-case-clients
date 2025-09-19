import { Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import { Pet } from '../../prisma/types.ts';
const prisma: PrismaClient = new PrismaClient();

interface PetResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: Pet[]
}

/**
 * Function to get all pets
 */
export async function getPets(req: Request, res: Response): Promise<void> {
  try {
    const pets: Pet[] = await prisma.pet.findMany();
    const petResponse: PetResponse = {
      meta: {
        count: pets.length,
        title: 'All pets',
        url: req.url
      },
      data: pets
    };
    res.status(200).send(petResponse);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Failed to retrieve pets',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}

/**
 * Function to get a pet by id
 */
export async function getPet(req: Request, res: Response): Promise<void>
{
  try {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send({
        error: {
          message: 'Invalid pet ID',
          code: 'INVALID_ID',
          url: req.url
        }
      });
      return;
    }
    const pet: Pet | null = await prisma.pet.findUnique({
      where: {id}
    });
    if (!pet) {
      res.status(404).send({
        error: {
          message: `Pet with ID ${id} not found`,
          code: 'NOT_FOUND',
          url: req.url
        }
      });
      return;
    }
    res.status(200).send(pet);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}

/**
 * Function to get all pet types
 */
export async function getPetByType(req: Request, res: Response): Promise<void> {
  try {
    const petType = req.query.pettype || 'No pet type provided';
    const pet[]: Pet[] | null = await prisma.pet.findMany({
      where: { pettype }
    })
    if (!pet[]) {
    res.status(404).send({
      error: {
        message: 'Invalid pet type',
        code: 'INVALID_TYPE',
        url: req.url
      }
    });
    return
  }
  res.status(200).send(pet[]);
} catch (error) {
  res.status(500).send({
      error: {
        message: 'Failed to retrieve owners',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}
