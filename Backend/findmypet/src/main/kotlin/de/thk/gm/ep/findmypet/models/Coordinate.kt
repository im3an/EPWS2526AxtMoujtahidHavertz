package de.thk.gm.ep.findmypet.models

import jakarta.persistence.Embeddable

@Embeddable
data class Coordinate(val longitude: Double, val latitude: Double) {
}