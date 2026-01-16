package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.SingleUse
import de.thk.gm.ep.findmypet.repositories.SingleUseRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class SingleUseServiceImpl(
    private val singleUseRepository: SingleUseRepository
): SingleUseService {
    override fun getAll(): List<SingleUse> {
        return singleUseRepository.findAll().toList()
    }

    override fun getById(id: UUID): SingleUse {
        return singleUseRepository.findById(id).orElse(null)
    }

    override fun getByName(name: String): SingleUse? {
        return singleUseRepository.findByName(name)
    }

    override fun save(singleUse: SingleUse): SingleUse {
        return singleUseRepository.save(singleUse)
    }

    override fun delete(singleUse: SingleUse) {
        singleUseRepository.delete(singleUse)
    }

}