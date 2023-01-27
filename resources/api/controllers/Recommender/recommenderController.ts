import { NextApiRequest, NextApiResponse } from 'next'
import getProducts from '../../services/getProducts'

interface AdvicesObj {
  // principiante: {
  //   _id: {
  //     $in: string[]
  //   }
  // }
  // desmateado: {
  //   format: string
  // }
  // saborizada: {
  //   _id: {
  //     $in: string[]
  //   }
  // }
  // intensa: {
  //   _id: {
  //     $in: string[]
  //   }
  // }
  // normal: {
  //   _id: {
  //     $in: string[]
  //   }
  // }
  // compuesta: {
  //   _id: {
  //     $in: string[]
  //   }
  // }
  [ key: string ]: any
}

export default async function recommenderController (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const advices: AdvicesObj = {
    principiante: {
      _id: {
        $in: [
          '635b588fbfe1881c841e7d10',
          '635b588fbfe1881c841e7d42',
          '635b588fbfe1881c841e7d16',
          '635b588fbfe1881c841e7d0d',
          '635b588fbfe1881c841e7d38'
        ]
      }
    },
    desmateado: {
      format: 'Kit'
    },
    saborizada: {
      _id: {
        $in: [
          '635b588fbfe1881c841e7cf9', // 'CBSé limón 500gr'
          '635b588fbfe1881c841e7cfb', // 'CBSé naranja 500gr'
          '635b588fbfe1881c841e7ce9', // 'CBSé energía guaraná 500gr'
          '635b588fbfe1881c841e7cfe', // 'CBSé pomelo 500gr'
          '635b588fbfe1881c841e7cee' // 'CBSé frutos del bosque 500gr'
        ]
      }
    },
    intensa: {
      _id: {
        $in: [
          '635b588fbfe1881c841e7d25',
          '635b588fbfe1881c841e7ce1',
          '635b588fbfe1881c841e7d12',
          '635b588fbfe1881c841e7cdb'
        ]
      }
    },
    normal: {
      _id: {
        $in: [
          '635b588fbfe1881c841e7d16', // 'Playadito 1kg',
          '635b588fbfe1881c841e7d42', // 'Unión suave',
          '635b588fbfe1881c841e7d0e', // 'La Merced campo y monte 500gr',
          '635b588fbfe1881c841e7d03', // 'Cruz de Malta 1kg',
          '635b588fbfe1881c841e7cc8' // 'Amanda 1kg'
        ]
      }
    },
    compuesta: {
      _id: {
        $in: [
          '6356b2fdd989572f88d20028', // 'Adelga mate 500gr',
          '635b588fbfe1881c841e7cd1', // 'Cachamate 500gr'
          '635b588fbfe1881c841e7cd4', // 'Cachamate hierbas pampeanas 500gr',
          '635b588fbfe1881c841e7d47', // 'Verdeflor menta 500gr',
          '635b588fbfe1881c841e7cf7', // 'CBSé hierbas serranas 500gr',
          '635b588fbfe1881c841e7ce5' // 'Canarias té verde y jengibre 1kg'
        ]
      }
    }
  }

  const advice: string | keyof AdvicesObj | undefined = Array.isArray(req.query.advice) ? req.query.advice[0] : req.query.advice
  if (advice === undefined) {
    res.status(400).json({ message: 'Parameters are missing' })
  } else {
    const query: string = Array.isArray(advices[advice]) ? advices[advice][0] : advices[advice]
    const beginFrom = 0
    const page = 1
    const limit = 15
    const sortQuery = {}

    const queries = {
      limit,
      query,
      beginFrom,
      page,
      sortQuery
    }

    try {
      const filteredProducts = await getProducts(queries)
      res.status(200).json(filteredProducts)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
